# Import packages

def fromCSVTOText(csv_file_path):
    df = pd.read_csv(csv_file_path)
    return df.to_string(index=False)
