from datetime import datetime, timedelta


def get_date(day):
    date_actually = datetime.today()
    date_format = date_actually.strftime('%d/%m/%Y')
    date_adic = date_actually + timedelta(days=day)
    date_adic_format = date_adic.strftime('%d/%m/%Y')

    return date_format, date_adic_format

if __name__ == '__main__':
    date_actualy, date_adic = get_date(30)
    print(date_actualy, date_adic)