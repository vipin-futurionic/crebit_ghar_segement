# Lead Table 📝

| Field        | Description                                            |
| ------------ | ------------------------------------------------------ |
| id           | A unique identifier for each row 🆔                    |
| customerId   | The ID of the customer this lead is associated with 👨‍💼 |
| customerName | The name of the customer 💬                            |
| phoneNo      | The phone number of the customer 📞                    |
| createdDate  | The date the lead was created 📅                       |
| updatedDate  | The date the lead was last updated 🕒️                 |

### A Lead represents a potential customer who has expressed interest in your product or service. 💡

### A lead is associated with a customer, which stores additional information about the customer. 📊

### A lead has a phone number, which is used to contact the customer. 📞

### A lead has creation and update dates, which are used to track when the lead was first created and last updated. 🕰️

# Segment Table 📝

| Field          | Description                                           |
| -------------- | ----------------------------------------------------- |
| id             | A unique identifier for each row 🆔                   |
| segmentName    | The name of the segment 📝                            |
| query          | The query that is used to retrieve this segment 🔍    |
| refreshCounter | The number of times the segment has been refreshed 🔄 |

### A segment represents a subset of leads that match a particular criteria. 🤔

### A segment has a name, which is used to identify the segment. 📝

### A segment has a query, which is used to retrieve the leads that belong to the segment. 🔍

### A segment has a refresh counter, which is used to track how many times the segment has been refreshed. 🔄

# SegmentData Table 📝

| Field          | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| id             | A unique identifier for each row 🆔                                             |
| leadId         | The ID of the lead this data is associated with 📝                              |
| segmentId      | The ID of the segment this data is associated with 📝                           |
| refreshCounter | The number of times the segment associated with this data has been refreshed 🔄 |

### A segment data row represents the relationship between a lead and a segment. 📝

### A segment data row is associated with a lead and a segment. 📝

### A segment data row has a refresh counter, which is used to track how many times the segment associated with this data has been refreshed. 🔄
