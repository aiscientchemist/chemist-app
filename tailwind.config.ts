import re
import pandas as pd
import pdfplumber

def extract_data_from_pdf(pdf_path):
    """Wyodrębnia dane z pliku PDF."""
    data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                data.append(text)
    return "\n".join(data)

def parse_video_data(text):
    """Parsuje tekst i wyodrębnia dane o filmach."""
    video_data = []
    video_entries = re.split(r'(?=Tytuł:)', text)  # Dzieli tekst na wpisy o filmach
    for entry in video_entries:
        if "Tytuł:" in entry:
            video = {}
            lines = entry.split('\n')
            for line in lines:
                if ':' in line:
                    key, value = line.split(':', 1)
                    video[key.strip()] = value.strip()
            video_data.append(video)
    return video_data

def create_dataframe(video_data):
    """Tworzy ramkę danych Pandas z wyodrębnionych danych."""
    df = pd.DataFrame(video_data)
    # Opcjonalnie: czyszczenie i transformacja danych
    # ...
    return df

def preprocess_text(text):
    """Przetwarza tekst (np. opisy filmów)."""
    text = re.sub(r'[^\w\s]', '', text).lower()  # Usuwa znaki specjalne i zmienia na małe litery
    return text

def prepare_data_for_ml(df):
    """Przygotowuje dane do uczenia maszynowego."""
    # Przykładowa kolumna do przetworzenia tekstu
    if 'Video Description' in df.columns:
        df['Video Description'] = df['Video Description'].apply(preprocess_text)
    # Opcjonalnie: kodowanie kategorii, skalowanie danych numerycznych
    # ...
    return df

# Główny skrypt
pdf_path = "youtube nr 1.pdf"  # Ścieżka do pliku PDF
extracted_text = extract_data_from_pdf(pdf_path)
video_data = parse_video_data(extracted_text)
df = create_dataframe(video_data)
df_prepared = prepare_data_for_ml(df)

# Teraz df_prepared zawiera dane gotowe do uczenia maszynowego
print(df_prepared.head())  # Wyświetla pierwsze wiersze ramki danych