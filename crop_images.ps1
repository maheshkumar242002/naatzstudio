Add-Type -AssemblyName System.Drawing

$src = "C:\Users\user\.gemini\antigravity-ide\brain\50ec3cee-58eb-468a-9009-b4a134cfc373\.user_uploaded\media_1790186107387.jpg"
$outDir = "d:\free\naatzstudio\public\images"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

Copy-Item -Path $src -Destination "$outDir\naatz_poster.jpg" -Force

$img = [System.Drawing.Bitmap]::FromFile($src)

function CropAndSave($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $cropped.Save("$outDir\$name.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Output "Cleanly cropped $name.jpg ($w x $h)"
}

# Row 1: Frames, Gifts, Posters (y: 196, height: 136)
CropAndSave "frames_real" 14 196 226 136
CropAndSave "gifts_real" 248 196 226 136
CropAndSave "posters_real" 482 196 190 136

# Row 2: Mobile, Service, Albums (y: 412, height: 124)
CropAndSave "mobile_real" 14 412 238 124
CropAndSave "service_real" 260 412 206 124
CropAndSave "albums_real" 474 412 198 124

# Row 3: Anime, Cars (y: 624, height: 134)
CropAndSave "anime_real" 14 624 238 134
CropAndSave "cars_real" 260 624 196 134

$img.Dispose()
Write-Output "Precision crops finished!"
