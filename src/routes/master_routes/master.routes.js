/**
 * @swagger
 * /master/members:
 *   get:
 *     summary: Retrieve all members
 *     responses:
 *       200:
 *         description: A list of members
 */

/**
 * @swagger
 * /master/books:
 *   get:
 *     summary: Retrieve all books
 *     responses:
 *       200:
 *         description: A list of books
 */

/**
 * @swagger
 * /master/availableBooks:
 *   get:
 *     summary: Retrieve available books
 *     responses:
 *       200:
 *         description: A list of available books
 */

/**
 * @swagger
 * /master/loans/{code}:
 *   get:
 *     summary: Retrieve loans by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The code of the loan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of loans
 */

/**
 * @swagger
 * /master/loans:
 *   post:
 *     summary: Insert a new loan
 *     responses:
 *       201:
 *         description: Loan successfully created
 */

/**
 * @swagger
 * /master/returned/book/{book_code}/member/{member_code}:
 *   post:
 *     summary: Return a book
 *     parameters:
 *       - in: path
 *         name: book_code
 *         required: true
 *         description: The code of the book being returned
 *         schema:
 *           type: string
 *       - in: path
 *         name: member_code
 *         required: true
 *         description: The code of the member returning the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
 */

var express = require("express");
var router = express.Router();

const MemberController = require("./../../controller/master_controller/memberController");
const LoansController = require("./../../controller/master_controller/loanController");
const BooksController = require("./../../controller/master_controller/bookController");

// MEMBERS
router.get("/members", MemberController.getMembers);

// BOOKS
router.get("/books", BooksController.getBooks);
router.get("/availableBooks", BooksController.getBooksAvailable);

// LOANS
router.get("/loans/:code", LoansController.getLoans);
router.post("/loans", LoansController.insertLoans);

// Return
router.post(
  "/returned/book/:book_code/member/:member_code",
  LoansController.returned
);

module.exports = router;
