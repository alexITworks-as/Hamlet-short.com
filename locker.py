import os
import getpass

FOLDER = "secret_folder"
PASSWORD = "201006"

def setup_folder():
    if not os.path.exists(FOLDER):
        os.mkdir(FOLDER)

        # Забираємо всі права
        os.system(f'icacls "{FOLDER}" /inheritance:r /deny %username%:F')

        # Робимо папку прихованою
        os.system(f'attrib +h "{FOLDER}"')


def unlock_folder():
    # Повертаємо доступ
    os.system(f'attrib -h "{FOLDER}"')
    os.system(f'icacls "{FOLDER}" /grant %username%:F')

    # Відкрити папку
    os.system(f'explorer "{FOLDER}"')


def lock_folder():
    # Забрати доступ назад
    os.system(f'icacls "{FOLDER}" /inheritance:r /deny %username%:F')
    os.system(f'attrib +h "{FOLDER}"')


def main():
    setup_folder()

    print("Введіть пароль:")
    user_pass = getpass.getpass()

    if user_pass == PASSWORD:
        print("Доступ дозволено")
        unlock_folder()

        input("Натисни Enter щоб знову закрити папку...")
        lock_folder()
    else:
        print("Невірний пароль!")


if __name__ == "__main__":
    main()