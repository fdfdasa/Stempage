def encode_vietnamese_alphabet():
    vietnamese_alphabet = "aáàảãạăắằẳẵặâấầẩẫậbcdđeéèẻẽẹêếềểễệfghiíìỉĩịjklmnoóòỏõọôốồổỗộơớờởỡợpqrstuúùủũụưứừửữựvwxyýỳỷỹỵz"
    special_characters = " +*/-<>=?!.,;:()[]{}'\"\\"
    char_map = {char: i + 1 for i, char in enumerate(vietnamese_alphabet)}
    char_map.update({char: i + len(vietnamese_alphabet) + 1 for i, char in enumerate(special_characters)})
    return char_map

def print_encoded_alphabet(char_map):
    print("Bảng mã hóa:")
    for char, code in char_map.items():
        print(f"{char} : {code}")

def process_output(encoded_word):
    # Loại bỏ mã 94 khỏi dãy số
    filtered_word = [code for code in encoded_word if code != 94]
    return filtered_word

def is_quadratic_equation(encoded_word):
    # Kiểm tra xem chuỗi có phải là phương trình bậc hai hay không
    if encoded_word.count(101) == 1 and encoded_word.count(95) == 1:
        return True
    return False

def main():
    char_map = encode_vietnamese_alphabet()
    
    command = input("Nhập từ hoặc lệnh ('lib:' để in bảng mã hóa): ").lower()
    
    if command == "lib:":
        print_encoded_alphabet(char_map)
    else:
        words = command.split()
        encoded_sentence = []
        for word in words:
            encoded_word = [char_map[char] for char in word if char in char_map]
            encoded_sentence.append(encoded_word)
        print("Mã hóa:", encoded_sentence)
        
        # Xử lý kết quả đầu ra
        processed_sentence = [process_output(word) for word in encoded_sentence]
        print("Kết quả sau khi xử lý:", processed_sentence)
        
        # Kiểm tra xem có phải là phương trình bậc hai không
        for word in processed_sentence:
            if is_quadratic_equation(word):
                print("Đây là phương trình bậc hai.")
            else:
                print("Đây không phải là phương trình bậc hai.")

if __name__ == "__main__":
    main()
