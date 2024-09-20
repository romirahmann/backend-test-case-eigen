const loanModel = require("../../model/loans.model");
const bookModel = require("../../model/book.model");
const memberModel = require("../../model/members.model");
const api = require("../../tools/common");

const getLoans = async (req, res) => {
  const { code } = req.params;
  try {
    let data = await loanModel.getLoansByMembers(code);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Invalid Server Error", 500);
  }
};

const insertLoans = async (req, res) => {
  const loan = req.body;
  try {
    let book = await bookModel.getStock(loan.book_code);
    let member = await memberModel.getMember(loan.member_code);
    const currentDate = new Date();
    const totalBooks = await memberModel.countBooksBorrowed(loan.member_code);
    if (book.stock !== 0) {
      if (
        member.penalty_end_date === null ||
        member.penalty_due_date < currentDate
      ) {
        if (totalBooks < 2) {
          try {
            let updateStock = {
              stock: book.stock - 1,
            };
            await bookModel.update(loan.book_code, updateStock);
            try {
              let data = await loanModel.insertLoans(loan);
              return api.ok(res, data);
            } catch {
              return api.error(res, "Insert Loan Failed", 500);
            }
          } catch {
            return api.error(res, "Update Stock Failed", 500);
          }
        } else {
          return api.error(res, "may not borrow more than 2 books", 500);
        }
      } else {
        return api.error(res, "Sorry, can't borrow books", 500);
      }
    } else {
      return api.error(res, "Book stock is not available", 404);
    }
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

// RETURN
const returned = async (req, res) => {
  const { member_code, book_code } = req.params;
  const newData = req.body;

  try {
    let dataLoan = await loanModel.getLoanByCode(member_code, book_code);

    const dueDate = new Date(dataLoan.due_date);
    const returnDate = new Date(newData.return_date);

    if (dueDate < returnDate) {
      try {
        const penalty_end_date = new Date(returnDate);
        penalty_end_date.setDate(penalty_end_date.getDate() + 3);
        const penalty_date = {
          penalty_start_date: returnDate,
          penalty_end_date: penalty_end_date,
        };
        // console.log(penalty_date);
        await memberModel.update(member_code, penalty_date);
        try {
          const newLoanData = {
            return_date: returnDate,
            is_returned: 1,
          };
          let data = await loanModel.update(
            member_code,
            book_code,
            newLoanData
          );
          try {
            let book = await bookModel.getStock(book_code, data);
            // console.log(book.stock);
            let updateStock = {
              stock: book.stock + 1,
            };
            let data = await bookModel.update(book_code, updateStock);
            return api.ok(res, data);
          } catch {
            return api.error(res, "Update stock book failure!", 500);
          }
        } catch {
          return api.error(res, "Return Failed!", 500);
        }
      } catch {
        return api.error(res, "Penalty Date not valid!", 500);
      }
    } else {
      console.log("aman");
    }
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = { getLoans, insertLoans, returned };
