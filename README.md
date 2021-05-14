# Field Agent Security Plan

**Total Time Est: 3:30**
 - Complete routing 1:00
    - Move add fetch to add component
    - Add add to routing in App
    - Implement add button on AgentList
    - Implement 404 page
    - Implement greeting page
 - Refresher on how to implement security - 0:30
 - Add login/logout/register link and display for username to AgentList 00:30
- Implement login 1:00
- Implement register 1:00
- Bug fixes/polish 0:30




# Field Agent UI Plan

**Total Time Est: 8:15**

## Components  
- **Button** - default button component to be used for multiple buttons  
- **AgentList** - this displays the list of agents (table)
- **Agent** -  individual agent info (a tr with tds)
- **Add** - a form for adding agents with submit and cancel button  
- **Edit** - form populated with agent info with submit and cancel button  
- **Delete** - activated when delete button is clicked

**Hierarchy**  
- AgentList
    - Agent
        - Edit Button
        - Delete Button
    - Add Button
- Add
    - Submit Button
    - Cancel Button
- Edit
    - Submit Button
    - Cancel Button
- Delete
    - Accept Button
    - Cancel Button


## Tasks

### Setup - Time Est: 0:15
- Create React project  
- Clean up extras from project  
- Add Bootstrap  

### Create Application - Time Est: 6:00
- Implement Button component - 0:30
- Implement AgentList component  - 1:00
- Implement Add component  - 1:00
- Implement Edit component  - 1:00
- Implement Delete component  - 0:30
- Implement all components in App  - 1:00
- Bug fixes/troubleshooting - 1:00

### Styling and polish  - Time Est: 2:00

### Extras (if time allows)
 - Implement a navbar
 - Implement cool spy landing page with "login" (will use for real login next week)