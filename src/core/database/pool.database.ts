import {Pool} from 'pg'

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'back_end_test_table',
    password: 'postgres',
    port: 5432,
})
