class apiResponse {
   constructor(statusCode, message = "Sucess", data) {
      this.statusCode = statusCode;
      this.message = message;
      this.success = statusCode < 400;
      this.data = data;
   }
}

/*  STATUS CODE
    1) informational response = 100 -199
    2) sucessful response = 200 - 299
    3) redirectional response = 300 - 399
    4) client error response = 400 - 499
    5) server error response = 500 - 599
 */

export { apiResponse };
