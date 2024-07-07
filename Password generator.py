import tkinter as tk
import string
import random

def generate_password():
    length=int(length_var.get())
    characters=string.ascii_letters+string.digits+string.punctuation
    password=''.join(random.choice(characters)for __ in range(length))
    password_var.set(password)

def copy_to_clipboard():
    generated_password=password_var.get()
    if generated_password:
        pyperclip.copy(generated_password)

window=tk.Tk()
window.title("Password Generator")
window.configure(bg="white")

password_var=tk.StringVar()
password_var.set("")

length_var=tk.StringVar()
length_var.set("14")


def set_password_length():
    try:
        password_length=int(length_var.get())
        if password_length <= 0:
            password_length = 1
        length_var.set(str(password_length))
    except ValueError:
        length_var.set("1")
length_label=tk.Label(window,text="Password Length:")
length_label.pack(pady=10,side="top")
length_label.configure(fg="white",bg="blue",font=("Arial",14,"bold"))

length_entry=tk.Entry(window,textvariable=length_var,width=10)
length_entry.pack(pady=5)
length_entry.configure(fg="white",bg="black",font=("Arial",14,"bold"))

generate_button=tk.Button(window,text="Generate Password",command=generate_password)
generate_button.pack(pady=5)
generate_button.configure(fg="white",bg="blue",font=("Arial",12,"bold"))

password_label=tk.Label(window,text="Generated Password:")
password_label.pack(pady=5)
password_label.configure(fg="white",bg="black",font=("Arial",14,"bold"))

generated_password=tk.Label(window,textvariable=password_var,relief="solid",font=("Arial",12))
generated_password.pack(pady=5)
generated_password.configure(fg="orange",bg="black",font=("Arial",14,"bold"))

window.mainloop()











        
            


