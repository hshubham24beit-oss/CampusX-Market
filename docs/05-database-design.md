# CampusX Market - Database Design

## Version
1.0 (MVP)

---

# Overview

CampusX Market is a marketplace exclusively for Pillai College students where every registered student can buy and sell products using a single account.

The database is designed using **MongoDB** and follows the principles of:

- Data Consistency
- Database Normalization
- Scalability
- Maintainability
- High Performance

---

# Database Design Decisions

## Decision #001

### Topic
How should seller information be stored inside the Product collection?

### Options Considered

**Option A**
Store seller name, department, year, phone number and other details inside every product.

**Option B**
Store only the `sellerId` and fetch seller information from the Users collection whenever required.

### Final Decision

✅ **Option B**

### Reason

- Avoids duplicate data.
- Keeps seller information consistent.
- Profile updates automatically reflect on all products.
- Easier maintenance.
- Follows database normalization principles.

---

## Decision #002

### Topic

How should student verification be handled?

### Options Considered

**Option A**
Manual verification using College ID Card.

**Option B**
Admin Approval.

**Option C**
Official College Email Verification.

### Final Decision

✅ **Option C**

Only students having an official email ending with

`@student.mes.ac.in`

can register.

### Reason

- Ensures only Pillai College students join the platform.
- Automatic verification.
- Better user experience.
- No manual verification required.
- Easy to expand for multiple colleges in the future.

---

## Decision #003

### Topic

Should buyers and sellers have separate accounts?

### Options Considered

**Option A**

Separate Buyer and Seller Accounts.

**Option B**

Single User Account.

### Final Decision

✅ **Option B**

### Reason

- Simpler user experience.
- One student can both buy and sell.
- Easier authentication.
- Less database complexity.

---

## Decision #004

### Topic

How should pickup information be stored?

### Options Considered

**Option A**

Store a single location field.

**Option B**

Store pickupLocation and pickupInstructions separately.

### Final Decision

✅ **Option B**

### Reason

- Clear pickup instructions.
- Better communication.
- No need for GPS.
- Easier for students to collect products.

Example:

Pickup Location:
Library Gate

Pickup Instructions:
Available after 4:30 PM.

---

## Decision #005

### Topic

Should Product store one image or multiple images?

### Options Considered

**Option A**

Single Image

**Option B**

Multiple Images

### Final Decision

✅ **Option B**

### Reason

- Buyers can view product from multiple angles.
- Better trust.
- Better product quality.
- Similar to Amazon and OLX.

---

## Decision #006

### Topic

Should Product store seller reviews?

### Final Decision

❌ No

### Reason

Reviews belong to a separate Reviews collection.

---

## Decision #007

### Topic

Should Product store likes?

### Final Decision

❌ No

### Reason

Wishlist already represents user interest.

No need to duplicate data.

---

## Decision #008

### Topic

How should product categories be stored?

### Options Considered

**Option A**

Store category name inside Product.

**Option B**

Store categoryId referencing Categories collection.

### Final Decision

✅ **Option B**

### Reason

- Avoid duplicate category names.
- Easy category management.
- Scalable.

---

## Decision #009

### Topic

How should Cart store products?

### Final Decision

Store only:

- userId
- productId
- quantity

### Reason

Avoid duplicate product information.

---

## Decision #010

### Topic

How should Wishlist store products?

### Final Decision

Store only:

- userId
- productId

### Reason

Simple relationship between users and products.

---

# Database Collections

The MVP contains the following collections.

1. Users
2. Products
3. Categories
4. Cart
5. Wishlist
6. Orders
7. Reviews
8. Chats
9. Messages
10. Notifications

---

# Collection 1 : Users

Stores information about registered students.

## Fields

| Field | Type | Required |
|--------|------|----------|
| _id | ObjectId | Yes |
| fullName | String | Yes |
| email | String (Unique) | Yes |
| password | String | Yes |
| phone | String | Yes |
| profileImage | String | No |
| department | String | Yes |
| year | Number | Yes |
| bio | String | No |
| isEmailVerified | Boolean | Yes |
| role | String | Yes |
| createdAt | Date | Yes |
| updatedAt | Date | Yes |

### Notes

- Passwords will be encrypted using bcrypt.
- Only `@student.mes.ac.in` emails are allowed.
- One account can both buy and sell.

---

# Collection 2 : Products

Stores all products listed by students.

## Fields

| Field | Type | Required |
|--------|------|----------|
| _id | ObjectId | Yes |
| sellerId | ObjectId | Yes |
| title | String | Yes |
| description | String | Yes |
| price | Number | Yes |
| categoryId | ObjectId | Yes |
| images | Array | Yes |
| condition | String | Yes |
| quantity | Number | Yes |
| status | String | Yes |
| pickupLocation | String | Yes |
| pickupInstructions | String | No |
| views | Number | No |
| createdAt | Date | Yes |
| updatedAt | Date | Yes |

### Product Status

- Available
- Reserved
- Sold

### Product Condition

- New
- Like New
- Good
- Fair

---

# Collection 3 : Categories

| Field | Type |
|--------|------|
| _id | ObjectId |
| name | String |
| icon | String |
| description | String |

### Categories

- Books
- Electronics
- Project Components
- Sports
- Hostel Essentials
- Calculators
- Stationery
- Clothing
- Others

---

# Collection 4 : Cart

| Field | Type |
|--------|------|
| _id | ObjectId |
| userId | ObjectId |
| productId | ObjectId |
| quantity | Number |
| createdAt | Date |

---

# Collection 5 : Wishlist

| Field | Type |
|--------|------|
| _id | ObjectId |
| userId | ObjectId |
| productId | ObjectId |
| createdAt | Date |

---

# Collection 6 : Orders

| Field | Type |
|--------|------|
| _id | ObjectId |
| buyerId | ObjectId |
| sellerId | ObjectId |
| productId | ObjectId |
| quantity | Number |
| totalPrice | Number |
| orderStatus | String |
| paymentMethod | String |
| createdAt | Date |
| updatedAt | Date |

### Order Status

- Pending
- Confirmed
- Completed
- Cancelled

### Payment Method (MVP)

- Cash on Pickup

---

# Collection 7 : Reviews

| Field | Type |
|--------|------|
| _id | ObjectId |
| productId | ObjectId |
| buyerId | ObjectId |
| sellerId | ObjectId |
| rating | Number |
| comment | String |
| createdAt | Date |

### Rule

Only verified buyers can submit reviews.

---

# Collection 8 : Chats

| Field | Type |
|--------|------|
| _id | ObjectId |
| buyerId | ObjectId |
| sellerId | ObjectId |
| productId | ObjectId |
| lastMessage | String |
| lastMessageAt | Date |
| createdAt | Date |

---

# Collection 9 : Messages

| Field | Type |
|--------|------|
| _id | ObjectId |
| chatId | ObjectId |
| senderId | ObjectId |
| message | String |
| messageType | String |
| isRead | Boolean |
| createdAt | Date |

### Message Types

- Text
- Image

---

# Collection 10 : Notifications

| Field | Type |
|--------|------|
| _id | ObjectId |
| userId | ObjectId |
| title | String |
| message | String |
| type | String |
| isRead | Boolean |
| createdAt | Date |

---

# Database Relationships

Users
│
├── Products
├── Cart
├── Wishlist
├── Orders
├── Reviews
├── Chats
├── Notifications
└── Messages

Products
│
└── Categories

Orders connect:

Buyer → User

Seller → User

Product → Product

Reviews connect:

Buyer → User

Seller → User

Product → Product

Messages connect:

Chat → Messages

---

# Database Status

| Collection | Status |
|------------|--------|
| Users | ✅ Completed |
| Products | ✅ Completed |
| Categories | ✅ Completed |
| Cart | ✅ Completed |
| Wishlist | ✅ Completed |
| Orders | ✅ Completed |
| Reviews | ✅ Completed |
| Chats | ✅ Completed |
| Messages | ✅ Completed |
| Notifications | ✅ Completed |

---

# Future Enhancements

Future versions of CampusX Market may include:

- Rent Module
- Exchange Module
- AI Product Description
- AI Price Suggestion
- AI Recommendation Engine
- AI Marketplace Assistant
- Online Payments
- Multi-College Support
- Mobile Application

---

# Conclusion

The database is designed to be scalable, secure, and maintainable. All collections use ObjectId references to reduce data duplication and maintain consistency. This architecture provides a strong foundation for future AI features, real-time communication, and multi-college expansion.