import dotenv from 'dotenv';

dotenv.config();

const users = [
    {
        email: 'john.doe@example.com',
        password: 'Passw0rd123',
        name: 'John Doe',
        bio: 'A software developer who loves coding.',
        profileImg: 'https://example.com/profiles/john.jpg',
    },
    {
        email: 'jane.smith@example.com',
        password: 'SecurePass456!',
        name: 'Jane Smith',
        bio: 'A UI/UX designer with a passion for art.',
        profileImg: 'https://example.com/profiles/jane.jpg',
    },
    {
        email: 'michael.williams@example.com',
        password: 'Str0ngP@ss789',
        name: 'Michael Williams',
        bio: 'A full-stack developer and tech enthusiast.',
        profileImg: 'https://example.com/profiles/michael.jpg',
    },
    {
        email: 'emily.johnson@example.com',
        password: 'EmilyR0cks2023',
        name: 'Emily Johnson',
        bio: 'A product manager with a keen eye for details.',
        profileImg: 'https://example.com/profiles/emily.jpg',
    },
    {
        email: 'robert.brown@example.com',
        password: 'P@ssw0rd321',
        name: 'Robert Brown',
        bio: 'A backend developer with expertise in databases.',
        profileImg: 'https://example.com/profiles/robert.jpg',
    },
    {
        email: 'sophia.miller@example.com',
        password: 'SophiaP@ss456',
        name: 'Sophia Miller',
        bio: 'An agile coach and project management expert.',
        profileImg: 'https://example.com/profiles/sophia.jpg',
    },
    {
        email: 'william.jones@example.com',
        password: 'W1ll1amPass789',
        name: 'William Jones',
        bio: 'A DevOps engineer with love for automation.',
        profileImg: 'https://example.com/profiles/william.jpg',
    },
    {
        email: 'olivia.taylor@example.com',
        password: 'Olivia123#Pass',
        name: 'Olivia Taylor',
        bio: 'A data scientist who enjoys working with big data.',
        profileImg: 'https://example.com/profiles/olivia.jpg',
    },
    {
        email: 'david.moore@example.com',
        password: 'D@v1dPass456',
        name: 'David Moore',
        bio: 'A mobile app developer specializing in Android.',
        profileImg: 'https://example.com/profiles/david.jpg',
    },
    {
        email: 'isabella.white@example.com',
        password: 'IsabellA789!',
        name: 'Isabella White',
        bio: 'A blockchain developer passionate about decentralized technologies.',
        profileImg: 'https://example.com/profiles/isabella.jpg',
    },
];

async function insertUsers(
    users: {
        email: string;
        password: string;
        name: string;
        bio: string;
        profileImg: string;
    }[]
) {
    try {
        await Promise.all(
            users.map((user) =>
                fetch(`http://localhost:3000/api/v1/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((error) =>
                        console.error('Error inserting user:', error)
                    )
            )
        );
    } catch (error) {
        console.error('Error inserting user:', error);
    }
}

insertUsers(users);
