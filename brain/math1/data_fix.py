import re

def convert_data_to_question(data):
    if data['topic'] is not None and data['start_year'] is not None:
        topic = data['topic']
        start_year = data['start_year']
        end_year = data['end_year'] if data['end_year'] is not None else start_year
        operator = data['operator']
        formula_variables = data['formula_variables']
        initial_value = data['initial_value']
        final_value = data['final_value']
        
        # Tạo câu hỏi mới từ thông tin có sẵn
        question = f"{topic}: Trong năm {start_year}, {topic} {operator} {final_value}% so với năm {end_year} trước."
        return question
    else:
        return None

def fix_question_pass_format(file_path):
    fixed_lines = []
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            # Sử dụng eval để chuyển đổi từ chuỗi JSON sang dictionary
            data = eval(line)
            # Chuyển đổi dữ liệu sang câu hỏi mới
            question = convert_data_to_question(data)
            if question:
                fixed_lines.append(question)
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write('\n'.join(fixed_lines))

# Sử dụng hàm để sửa đổi định dạng của tệp 'question_pass.txt'
fix_question_pass_format('./brain/data_train/question_pass.txt')
