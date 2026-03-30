$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$pages = @(
  "maquinas.html",
  "navalhas.html",
  "kits.html",
  "cremes.html",
  "escovas.html",
  "acessorios.html"
)

$headers = @{
  "User-Agent" = "Mozilla/5.0"
}

$cardPattern = '<article class="card">(?<card>.*?)</article>'
$titlePattern = '<h2>(?<title>.*?)</h2>'
$urlPattern = 'href="(?<url>https://www\.amazon\.es/dp/[^"]+)"'

$results = New-Object System.Collections.Generic.List[object]

foreach ($page in $pages) {
  $path = Join-Path $root $page
  if (-not (Test-Path $path)) {
    continue
  }

  $html = Get-Content $path -Raw
  $cards = [regex]::Matches($html, $cardPattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

  foreach ($card in $cards) {
    $cardHtml = $card.Groups["card"].Value
    $titleMatch = [regex]::Match($cardHtml, $titlePattern)
    $urlMatch = [regex]::Match($cardHtml, $urlPattern)

    if (-not $urlMatch.Success) {
      continue
    }

    $title = if ($titleMatch.Success) { $titleMatch.Groups["title"].Value } else { "Sem titulo" }
    $url = $urlMatch.Groups["url"].Value

    try {
      $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers $headers
      $pageHtml = $response.Content

      $hasNoFeaturedOffer = $pageHtml.Contains("Ofertas destacadas no disponibles") -or $pageHtml.Contains("No featured offers available")
      $hasOptionsOnly = $pageHtml.Contains("Ver todas las opciones de compra") -or $pageHtml.Contains("See All Buying Options")
      $hasAddToCart = $pageHtml.Contains("add-to-cart-button")
      $hasBuyNow = $pageHtml.Contains("buy-now-button")
      $isUnavailable = $pageHtml.Contains("Actualmente no disponible")

      $status = if ($isUnavailable) {
        "check"
      } elseif ($hasNoFeaturedOffer -and -not $hasBuyNow) {
        "check"
      } elseif ($hasOptionsOnly -and -not $hasBuyNow) {
        "check"
      } elseif ($hasAddToCart) {
        "ok"
      } else {
        "ok"
      }

      $results.Add([pscustomobject]@{
        page = $page
        title = $title
        status = $status
        add_to_cart = $hasAddToCart
        buy_now = $hasBuyNow
        no_featured_offer = $hasNoFeaturedOffer
        options_only = $hasOptionsOnly
        url = $url
      })
    } catch {
      $results.Add([pscustomobject]@{
        page = $page
        title = $title
        status = "error"
        add_to_cart = $false
        buy_now = $false
        no_featured_offer = $false
        options_only = $false
        url = $url
      })
    }
  }
}

$reportPath = Join-Path $root "amazon-product-health.json"
$results | ConvertTo-Json -Depth 4 | Set-Content $reportPath

$results |
  Sort-Object page, status, title |
  Format-Table page, title, status, add_to_cart, buy_now, no_featured_offer -AutoSize

Write-Host ""
Write-Host "Relatorio guardado em $reportPath"
