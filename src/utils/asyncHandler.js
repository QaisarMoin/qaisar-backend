// asyncHandler is high order function which means that it take function as a input and return a function as output
const asyncHandler = (requesthandler) => {
   return (req, res, next) => {
      Promise.resolve(requesthandler(req, res, next)).catch((error) =>
         next(error)
      );
   };
};

export { asyncHandler };
