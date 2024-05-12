from sympy import symbols, Rational, latex

# Định nghĩa các biến
x, y = symbols('x y')

# Tạo phân số
frac = Rational(3, 4)

# In phân số dưới dạng LaTeX
print("Phân số:", latex(frac))

# Tạo biểu thức toán học
expr = (x + 1) / (-x + 2 * y)

# In biểu thức toán học dưới dạng LaTeX
print("Biểu thức toán học:", latex(expr))

# Tính đạo hàm của biểu thức
derivative = expr.diff(x)

# In đạo hàm dưới dạng LaTeX
print("Đạo hàm của biểu thức:", latex(derivative))
