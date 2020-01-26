/**
 * Query class that functions as a SQL query using chainable methods
 * @generic T: Type of entity in a query ([T, T, T, ...])
 * @generic U: Type of a returned entity when execute() is called. Defaults to T. [U, U, U, ...]
 */
class Query<T, U> {
    private _data?: T[];
    private _selectFn?: (entity: T) => U;
    private _wheres: ((entity: T) => boolean)[] = [];

    select = <V extends T, K extends U>(selectFn?: (entity: V) => K) => {
        if (this._selectFn) throw new Error("Duplicate SELECT");
        if (selectFn) {
            this._selectFn = (selectFn as unknown) as (entity: T) => U;
        } else {
            this._selectFn = (entity) => (entity as unknown) as U;
        }
        return (this as unknown) as Query<V, K>;
    };

    from = <V extends T>(...data: V[][]) => {
        if (this._data) throw new Error("Duplicate FROM");
        this._data = ([] as V[]).concat.apply([], data);
        return (this as unknown) as Query<V, U>;
    };

    where = <V extends T>(...clauses: ((entity: V) => boolean)[]) => {
        this._wheres = this._wheres.concat(
            clauses as ((entity: T) => boolean)[]
        );
        return (this as unknown) as Query<V, U>;
    };

    execute = (): U[] => {
        if (!this._data) return [];
        if (!this._selectFn) {
            this._selectFn = (entity) => (entity as unknown) as U;
        }

        return this._data
            .filter((entity) => this._wheres.every((clause) => clause(entity)))
            .map(this._selectFn);
    };

    // having = (_has: any) => {
    //     return (this as unknown) as Query<T, U>;
    // };

    // orderBy = (_by: any) => {
    //     return (this as unknown) as Query<T, U>;
    // };

    // groupBy = (..._bys: any[]) => {
    //     return (this as unknown) as Query<T, U>;
    // };
}

export const query = () => new Query();

const data = [
    {
        id: 1,
        firstName: "Kristina",
        lastName: "Bruckshaw",
        email: "kbruckshaw0@altervista.org",
        gender: "Female",
    },
    {
        id: 2,
        firstName: "Orrin",
        lastName: "Velareal",
        email: "ovelareal1@auda.org.au",
        gender: "Male",
    },
    {
        id: 3,
        firstName: "Mariellen",
        lastName: "Anster",
        email: "manster2@shinystat.com",
        gender: "Female",
    },
    {
        id: 4,
        firstName: "Aime",
        lastName: "Biermatowicz",
        email: "abiermatowicz3@narod.ru",
        gender: "Female",
    },
    {
        id: 5,
        firstName: "Shelby",
        lastName: "O'Suaird",
        email: "sosuaird4@fema.gov",
        gender: "Male",
    },
    {
        id: 6,
        firstName: "Pancho",
        lastName: "Alishoner",
        email: "palishoner5@xing.com",
        gender: "Male",
    },
    {
        id: 7,
        firstName: "Teddy",
        lastName: "Fitton",
        email: "tfitton6@youtu.be",
        gender: "Male",
    },
    {
        id: 8,
        firstName: "Anatole",
        lastName: "Moreno",
        email: "amoreno7@telegraph.co.uk",
        gender: "Male",
    },
    {
        id: 9,
        firstName: "Kerrin",
        lastName: "Grishankov",
        email: "kgrishankov8@cafepress.com",
        gender: "Female",
    },
    {
        id: 10,
        firstName: "Justina",
        lastName: "Evason",
        email: "jevason9@businessinsider.com",
        gender: "Female",
    },
];

console.warn(
    query()
        .from(data)
        .select(
            ({ id, firstName, lastName }) => `#${id}: ${firstName} ${lastName}`
        )
        .where(
            ({ id }) => id <= 3,
            ({ gender }) => gender == "Female"
        )
        .execute()
);
