# Pokémon Shiny Hunt Tracker API

A REST API built with AdonisJS to help shiny hunters track their captured shinies and active hunts.

## Features

- **Authentication**: Register, Login, and Logout functionality.
- **Shiny Collection**: specific tracking for captured/obtained shiny Pokémon.
- **Shiny Hunts**: Track active hunts with counters, timers, and method tracking.
- **Data**: Read-only access to Pokémon (Gen 1-9) and Game data.
- **Security**: IDOR protection ensures users can only manage their own data.

## Tech Stack

- **Framework**: AdonisJS v6
- **Language**: TypeScript
- **Database**: MySQL
- **Validation**: VineJS
- **ORM**: Lucid

## Setup Instructions

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd pokemon-shiny-hunt-tracker-api
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

    Generate app key:

    ```bash
    node ace generate:key
    ```

4.  **Database Setup**
    Run migrations and seed the database with Pokémon, Games, and Methods:

    ```bash
    node ace migration:run
    node ace db:seed
    ```

5.  **Run the Server**
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:3333`.

## API Reference

### Authentication

- `POST /auth/register` - Create a new account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout (Requires Auth)

### User

- `GET /users/myself` - Get current user profile
- `PATCH /users/myself` - Update profile
- `DELETE /users/myself` - Delete account

### Resources (Read-Only)

- `GET /pokemon` - List all Pokémon
- `GET /pokemon/:id` - Get specific Pokémon details
- `GET /games` - List all Games
- `GET /games/:id` - Get specific Game details
- `GET /methods` - List all Hunting Methods
- `GET /methods/:id` - Get specific Method details

### Shiny Collection

- `GET /collection` - List my captured shinies
- `GET /collection/:id` - Get specific captured shiny
- `POST /collection` - Add a shiny manually
- `PATCH /collection/:id` - Update details (notes, dates, etc.)
- `DELETE /collection/:id` - Remove from collection

### Shiny Hunts (Active)

- `GET /hunts` - List active hunts
- `GET /hunts/:id` - Get hunt details
- `POST /hunts` - Start a new hunt
- `DELETE /hunts/:id` - Delete a hunt
- `PATCH /hunts/:id/increment` - Increment encounter counter
- `PATCH /hunts/:id/decrement` - Decrement encounter counter
- `PATCH /hunts/:id/pause` - Pause hunt timer
- `PATCH /hunts/:id/resume` - Resume hunt timer
- `POST /hunts/:id/finish` - Complete hunt (Moves it to Collection)
