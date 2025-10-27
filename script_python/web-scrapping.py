from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import sys
import io

def scrape_now_playing():
    opts = Options()
    opts.add_argument("--headless")
    opts.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=opts)

    try:
        driver.get("https://www.ingresso.com/filmes?city=rio-de-janeiro#now-playing")

        # aguarda carregar algum card de filme
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div[data-testid="event-item"]'))
        )

        soup = BeautifulSoup(driver.page_source, "html.parser")
    finally:
        driver.quit()

    filmes = []
    for card in soup.select('div[data-testid="event-item"]'):
        titulo_tag = card.select_one("h4")
        imagem_tag = card.select_one("img")
        if titulo_tag and imagem_tag and imagem_tag.get("src"):
            filmes.append({
                "titulo": titulo_tag.get_text(strip=True),
                "poster": imagem_tag["src"],
            })

    # grava o JSON num arquivo UTF‑8 para uso posterior (opcional)
    with open("filmes_now_playing.json", "w", encoding="utf-8") as f:
        json.dump(filmes, f, ensure_ascii=False, indent=2)

    # reconfigura o stdout para UTF‑8 (Python ≥ 3.7)
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        # fallback para versões mais antigas de Python
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    # imprime o JSON no stdout (o Node pode ler dessa saída)
    sys.stdout.write(json.dumps(filmes, ensure_ascii=False))
    sys.stdout.write("\n")

if __name__ == "__main__":
    scrape_now_playing()