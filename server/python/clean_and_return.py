# python/clean_and_return.py
import sys
import pandas as pd
import json

column_map = {
    'title': ['title', 'question', 'questions', 'problem'],
    'category': ['category', 'topic', 'type'],
    'difficulty': ['difficulty', 'level'],
    'companyTags': ['companytags', 'tags', 'company','companies', 'asked by'],
    'link': ['link', 'url', 'leetcode link', 'problem link'],
    'check': ['check', 'done', 'mark as done', 'status', 'solved']
}

def match_column(possible_names, available_columns):
    for name in possible_names:
        for col in available_columns:
            if name.strip().lower() in col.strip().lower():
                return col
    return None

def extract_and_return(input_file_path):
    df = pd.read_excel(input_file_path)
    selected_columns = {}
    for key, possible_names in column_map.items():
        match = match_column(possible_names, df.columns)
        if match:
            selected_columns[key] = match

    if not selected_columns:
        print(json.dumps([]))
        return

    new_df = df[[selected_columns[k] for k in selected_columns]]
    new_df.columns = selected_columns.keys()
    print(new_df.to_json(orient="records"))

if __name__ == "__main__":
    extract_and_return(sys.argv[1])
