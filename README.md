# Bank Msg Analyzer

**Bank Msg Analyzer** is a simple tool that processes banking messages to analyze credited and debited transactions. It reads a JSON file of SMS messages, extracts the relevant amounts (credited/debited amounts, service charges, and VAT), and returns summary statistics for the bank's transactions.

## Setup Instructions

Follow these steps to set up and run the project locally.

### Steps

1. **Clone the repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/baydisng13/bank-msg-analyzer.git
   cd bank-msg-analyzer
   ```

2. **Install dependencies**

   Install the necessary dependencies by running:

   ```bash
   pnpm install
   ```

3. **Prepare the message file**

   - You can export the messages using the mobile app from this [link](https://github.com/tmo1/sms-ie/releases/tag/v2.4.1).
   - Extract the ZIP file and find the `messages.ndjson` file.
   - Rename the file from `messages.ndjson` to `messages.json`.
   - Properly format the JSON file into a valid JSON array (ensure it’s a well-formed JSON with commas separating the array elements).

4. **Save the `messages.json` file**

   Once your file is formatted correctly, save it as `messages.json` in the root of the project directory.

5. **Run the server**

   Now, you can run the server to process the messages:

   ```bash
   pnpm start
   ```

   This will start a server on `http://localhost:3009`.

6. **View the Results**

   Open your browser or use a tool like Postman to visit:

   ```
   http://localhost:3009
   ```

   The server will return a JSON response with a summary of the credited and debited transactions:

   ```json
   {
     "CBE": {
       "credited": {
         "total_credited_amount": 5000.0,
         "number_of_transactions": 5
       },
       "debited": {
         "total_debited_amount": 2000.0,
         "service_charge": 50.0,
         "vat": 5.0,
         "number_of_transactions": 3
       }
     }
   }
   ```

### TODO

- [x] Add support for Commercial Bank of Ethiopia
- [ ] Refactor to support multiple banks
- [ ] Add support for Telebirr
- [ ] Add support for Awash International Bank
- [ ] Add support for M pesa
- [ ] Add support for CBE BIRR
- [ ] Add support for Bank of Abyssinia
- [ ] Add support for Dashen Bank


### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


