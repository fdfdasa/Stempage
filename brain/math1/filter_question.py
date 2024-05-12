import re

def extract_data(sample):
    # Xác định chủ đề
    match_topic = re.search(r'"([^"]+)"', sample)
    if match_topic:
        topic = match_topic.group(1)
    else:
        topic = None
    
    # Xác định thông tin về khoảng thời gian và các giá trị
    match_years = re.findall(r'\b\d{4}\b', sample)
    if len(match_years) >= 2:
        start_year = int(match_years[0])
        end_year = int(match_years[1])
    else:
        start_year = None
        end_year = None
    
    # Xác định công thức tính toán
    match_formula = re.search(r'y\s*=\s*(\w+)\s*([*/+-])\s*(\w+)', sample)
    if match_formula:
        operator = match_formula.group(2)
        formula_variables = match_formula.groups()
    else:
        operator = None
        formula_variables = None
    
    # Xác định giá trị ban đầu và cuối cùng
    match_initial_value = re.search(r'(\d+)\w+', sample)
    if match_initial_value:
        initial_value = int(match_initial_value.group(1))
    else:
        initial_value = None
    
    match_final_value = re.search(r'(\d+)\w+\s*$', sample)
    if match_final_value:
        final_value = int(match_final_value.group(1))
    else:
        final_value = None
    
    return topic, start_year, end_year, operator, formula_variables, initial_value, final_value

def convert_to_structured_data(samples):
    structured_data = []
    for sample in samples:
        topic, start_year, end_year, operator, formula_variables, initial_value, final_value = extract_data(sample)
        structured_data.append({
            "topic": topic,
            "start_year": start_year,
            "end_year": end_year,
            "operator": operator,
            "formula_variables": formula_variables,
            "initial_value": initial_value,
            "final_value": final_value
        })
    return structured_data

def process_question_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f_in:
        questions_data = f_in.readlines()

    # Chuyển đổi dữ liệu
    structured_data = convert_to_structured_data(questions_data)

    # Ghi kết quả vào tệp mới
    with open(output_file, 'w', encoding='utf-8') as f_out:
        for data in structured_data:
            f_out.write(str(data) + '\n')

# Đường dẫn tệp input và output
input_file = './brain/data_train/questions.txt'
output_file = './brain/data_train/question_pass.txt'

# Xử lý tệp và ghi kết quả vào tệp mới
process_question_file(input_file, output_file)
