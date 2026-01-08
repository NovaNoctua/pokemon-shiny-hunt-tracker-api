# Pokémon Shiny Collection & Shiny Hunt Tracker

**Technical Design Document – Backend (AdonisJS)**

---

## 1. Project Overview

**Purpose:**
Provide a **REST API** to manage Pokémon data, games, shiny collections, and shiny hunts. All user-specific data is handled through authenticated endpoints.

**Tech Stack:**

- AdonisJS (latest stable)
- SQLite (development), PostgreSQL/MySQL (production)
- REST API architecture
- Authentication & authorization using AdonisJS Auth

---

## 2. MVP Scope

### Included

- Pokémon database (National Dex, basic info)
- Games database
- Shiny collection management
- Shiny hunt management
- User registration/login
- Basic statistics (counts, completion percentage)

### Excluded

- Pokémon forms & variants
- Social/sharing features
- Advanced stats/analytics

---

## 3. Core Features

### Pokémon & Games

- Static data: Pokémon (id, dex_number, name, generation, shiny_available)
- Static data: Games (id, name, generation, version)

### Shiny Collection

- CRUD for user-owned shiny Pokémon
- Track Pokémon per game
- Optional notes

### Shiny Hunts

- CRUD for shiny hunts
- Multiple hunts per Pokémon allowed
- Metadata: game, method, counter, start/end dates, status

### Users

- Registration/login/logout
- User-specific data (collections & hunts)

### Statistics (Basic)

- Total shinies owned
- Completion percentage
- Shiny count per game
- Active hunts count

---

## 4. Data Model

### User

| Field      | Type      | Notes  |
| ---------- | --------- | ------ |
| id         | PK        |        |
| username   | string    | unique |
| email      | string    | unique |
| password   | string    | hashed |
| created_at | timestamp |        |

### Pokemon

| Field           | Type    | Notes  |
| --------------- | ------- | ------ |
| id              | PK      |        |
| dex_number      | int     | unique |
| name            | string  |        |
| generation      | int     |        |
| shiny_available | boolean |        |

### Game

| Field      | Type   | Notes |
| ---------- | ------ | ----- |
| id         | PK     |       |
| name       | string |       |
| generation | int    |       |
| version    | string |       |

### Entry

| Field                                                   | Type         | Notes    |
| ------------------------------------------------------- | ------------ | -------- |
| id                                                      | PK           |          |
| user_id                                                 | FK → User    |          |
| pokemon_id                                              | FK → Pokemon |          |
| game_id                                                 | FK → Game    |          |
| obtained_at                                             | date         |          |
| notes                                                   | text         | optional |
| **Constraint:** unique `(user_id, pokemon_id, game_id)` |              |          |

### Hunt

| Field      | Type         | Notes                          |
| ---------- | ------------ | ------------------------------ |
| id         | PK           |                                |
| user_id    | FK → User    |                                |
| pokemon_id | FK → Pokemon |                                |
| game_id    | FK → Game    |                                |
| method     | enum         | RE, Masuda, Reset              |
| counter    | int          | optional                       |
| status     | enum         | active / completed / abandoned |
| started_at | date         |                                |
| ended_at   | date         | nullable                       |

---

### Relationships

- User → has many → Entry
- User → has many → Hunt
- Pokemon → has many → Entry / Hunt
- Game → has many → Entry / Hunt

---

## 5. API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Pokémon

- `GET /api/pokemon`
- `GET /api/pokemon/:id`

### Games

- `GET /api/games`

### Shiny Collection

- `GET /api/collection`
- `POST /api/collection`
- `DELETE /api/collection/:id`

### Shiny Hunts

- `GET /api/hunts`
- `POST /api/hunts`
- `PATCH /api/hunts/:id`
- `DELETE /api/hunts/:id`

---

## 6. Controllers Structure

```
app/
 ├─ Controllers/
 │   ├─ AuthController.ts
 │   ├─ PokemonController.ts
 │   ├─ GameController.ts
 │   ├─ ShinyCollectionController.ts
 │   └─ ShinyHuntController.ts
 ├─ Models/
 ├─ Services/
 └─ Validators/
```

---

## 7. Development Roadmap

1. Setup AdonisJS + DB
2. Authentication endpoints
3. Seed Pokémon & games data
4. CRUD for collections & hunts
5. Basic statistics endpoints
6. Validation & error handling

---

## 8. Common Pitfalls

- Duplicates in collections/hunts
- Multiple hunts for same Pokémon
- Keeping static data separate from user data
- Proper foreign key constraints
