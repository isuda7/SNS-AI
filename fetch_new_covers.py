import urllib.parse
import subprocess

books = [
    "칩 워", "호모 데우스", "특이점이 온다", "클라라와 태양", "이기적 유전자", "생각하는 기계",
    "돈의 심리학", "부자의 그릇", "역행자", "트렌드 코리아 2024", "더 골", "원씽"
]

for book in books:
    query = urllib.parse.quote(book)
    cmd = f"curl -s 'https://www.yes24.com/Product/Search?domain=ALL&query={query}' | grep -o 'https://image.yes24.com/goods/[0-9]*/[A-Z]*' | head -n 1"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f"{book}: {result.stdout.strip()}")
