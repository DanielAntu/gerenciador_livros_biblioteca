import io

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def generate_pdf(loan: dict):
    buffer = io.BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    title = 'Recibo de empréstimo de livro'
    name = f'Nome completo: {loan['nameClient']}'
    cpf = f'CPF: {loan['cpf']}'
    book = f'Título do livro: {loan['title']}'
    book_id = f'ID do empréstimo: {loan['id']}'
    date_loan = f'Data do empréstimo: {loan['dateLoan']}'
    date_return = f'Date da devolução: {loan['dateReturn']}'

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(width / 2, height - 50, title)

    pdf.setFont("Helvetica", 12)
    pdf.drawString(100, height - 100, name)
    pdf.drawString(100, height - 130, cpf)
    pdf.drawString(100, height - 160, book)
    pdf.drawString(100, height - 190, book_id)
    pdf.drawString(100, height - 220, date_loan)
    pdf.drawString(100, height - 250, date_return)

    pdf.showPage()
    pdf.save()
    buffer.seek(0)

    return buffer

if __name__ == '__main__':
    data = {
        'nameClient': 'Daniel Antunes',
        'cpf': '111.111.111-11',
        'title': 'Qualquer titulo',
        'dateLoan': '12/02/2025',
        'dateReturn': '15/02/2025'
    }

    generate_pdf(data)

