from flask import Blueprint

from controllers.loanController import (delete_loan, filter_is_return,
                                        generate_receipt, get_loan_by_id,
                                        get_loans, loan_return, register,
                                        search_loan)

loan_bp = Blueprint('loan', __name__)

loan_bp.route('/register/<int:id>', methods=['POST'])(register)
loan_bp.route('')(get_loans)
loan_bp.route('/<int:id>')(get_loan_by_id)
loan_bp.route('/<int:id>', methods=['PATCH'])(loan_return)
loan_bp.route('/<int:id>', methods=['DELETE'])(delete_loan)
loan_bp.route('/search')(search_loan)
loan_bp.route('/isreturn')(filter_is_return)
loan_bp.route('/dowloadPDF/<int:id>')(generate_receipt)