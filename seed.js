const seed = require("./seed.json");
const Address = require("./schemas/Address");
const mongoose = require("mongoose");
const Web3 = require("web3");
const { argv } = require("process");
require("dotenv").config();

const validParams = ["seed", "validate"];

if (argv[2] === undefined || !validParams.includes(argv[2])) {
  console.log("Please provide an option (seed/validate)");
  process.exit();
}

/**
 * seed database from the seed.json file
 */
const seedData = async () => {
  // connect to db
  await mongoose.connect(process.env.MONGO_URL || "");

  Address.insertMany(seed)
    .then(() => console.log("data inserted"))
    .catch((err) => console.error("Error: ", err));
};

// validate if wallet address is valid by using web3.js
const validateWalletAddress = () => {
  return seed.filter((address) => !Web3.utils.isAddress(address.address));
};

/**
 * check if the list has duplicate addresses
 *
 * @returns {Array}
 */
const checkDuplicateAddress = () => {
  const lookup = seed.reduce((a, b) => {
    a[b.address] = ++a[b.address] || 0;
    return a;
  });

  return seed.filter((address) => lookup[address.address]);
};

/**
 * check if the list has duplicate user id
 *
 * @returns  {Array}
 */
const checkDuplicateUserId = () => {
  const lookup = seed.reduce((a, b) => {
    a[b.user.id] = ++a[b.user.id] || 0;
    return a;
  });

  return seed.filter((address) => lookup[address.user.id]);
};

/**
 * Function to validate all at once
 */
const validateDate = () => {
  const invalidWallets = validateWalletAddress();
  if (invalidWallets.length > 0) {
    console.log("Invalid addresses: ");
    console.log(invalidWallets);
  }

  const duplicateAddresses = checkDuplicateAddress();
  if (duplicateAddresses.length > 0) {
    console.log("Duplicate addresses: ");
    console.log(duplicateAddresses);
  }

  const duplicateUserId = checkDuplicateUserId();
  if (duplicateUserId.length > 0) {
    console.log("Duplicate User ID: ");
    console.log(duplicateUserId);
  }

  console.log("Validation Completed");
};

if (argv[2] === "seed") {
  seedData();
} else if (argv[2] === "validate") {
  validateDate();
}
