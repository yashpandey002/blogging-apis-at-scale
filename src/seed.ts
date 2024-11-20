import dotenv from 'dotenv';

dotenv.config();

const users = [
    {
        email: 'pandeyyash002@gmail.com',
        password: 'Yp12345678',
        name: 'Yash Pandey',
        bio: 'A full-stack developer who loves to solve problems using design and code.',
        profileImg: 'https://example.com/profiles/yash.jpg',
    },
    {
        email: 'aditimaheshwari2002@gmail.com',
        password: 'Ad12345678',
        name: 'Aditi Maheshwari',
        bio: 'A fun-loving girl who loves to code.',
        profileImg: 'https://example.com/profiles/aditi.jpg',
    },
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

const articles = [
    {
        title: 'Mastering SEO for Content Writing',
        subtitle: 'How to Optimize Your Articles for Search Engines',
        body: 'SEO is essential for getting your articles seen by a wider audience. This guide covers keyword research, on-page optimization, and the best practices for writing SEO-friendly content...',
        slug: 'mastering-seo-for-content-writing',
        tags: [
            { name: 'SEO' },
            { name: 'content writing' },
            { name: 'optimization' },
            { name: 'keywords' },
            { name: 'best practices' },
        ],
    },
    {
        title: 'Boosting Creativity in Your Writing',
        subtitle: 'Techniques for Crafting Unique and Original Articles',
        body: "Writer's block can make it difficult to create fresh content. Here are some creativity-boosting strategies to help you overcome this hurdle and bring new ideas to your writing...",
        slug: 'boosting-creativity-in-your-writing',
        tags: [
            { name: 'creativity' },
            { name: 'writing' },
            { name: 'inspiration' },
            { name: 'ideas' },
            { name: 'techniques' },
        ],
    },
    {
        title: 'Understanding Your Audience',
        subtitle: 'The Key to Writing Articles that Connect',
        body: 'Knowing your audience is crucial for effective writing. This article provides tips on researching your audience and tailoring your content to meet their needs...',
        slug: 'understanding-your-audience',
        tags: [
            { name: 'audience' },
            { name: 'research' },
            { name: 'engagement' },
            { name: 'connection' },
            { name: 'writing tips' },
        ],
    },
    {
        title: 'The Importance of Headlines',
        subtitle: 'How to Write Headlines that Grab Attention',
        body: "A strong headline is key to capturing a reader's interest. This article explores techniques for crafting headlines that are engaging and relevant to your content...",
        slug: 'importance-of-headlines',
        tags: [
            { name: 'headlines' },
            { name: 'attention' },
            { name: 'writing' },
            { name: 'engagement' },
            { name: 'tips' },
        ],
    },
    {
        title: 'Using Storytelling in Articles',
        subtitle: 'Making Your Content More Relatable and Memorable',
        body: 'Storytelling can make content more engaging by adding a human touch. Here are some storytelling techniques to help your articles resonate with readers...',
        slug: 'using-storytelling-in-articles',
        tags: [
            { name: 'storytelling' },
            { name: 'engagement' },
            { name: 'relatable' },
            { name: 'writing' },
            { name: 'techniques' },
        ],
    },
    {
        title: 'Crafting Powerful Conclusions',
        subtitle: 'Leaving a Lasting Impression with Your Articles',
        body: 'A strong conclusion reinforces the main points and leaves readers with something to remember. Learn how to write impactful conclusions...',
        slug: 'crafting-powerful-conclusions',
        tags: [
            { name: 'conclusions' },
            { name: 'impact' },
            { name: 'writing tips' },
            { name: 'engagement' },
            { name: 'lasting impression' },
        ],
    },
    {
        title: 'Editing and Proofreading Tips',
        subtitle: 'Polishing Your Articles for Professional Quality',
        body: 'Editing is essential for producing high-quality content. This guide covers key editing and proofreading techniques to make your articles shine...',
        slug: 'editing-and-proofreading-tips',
        tags: [
            { name: 'editing' },
            { name: 'proofreading' },
            { name: 'quality' },
            { name: 'content' },
            { name: 'writing tips' },
        ],
    },
    {
        title: 'Writing for Different Platforms',
        subtitle: 'Adapting Your Content for Blogs, Social Media, and More',
        body: 'Each platform has unique content needs. Here are tips on adapting your writing style and format to reach the audience on each platform...',
        slug: 'writing-for-different-platforms',
        tags: [
            { name: 'platforms' },
            { name: 'adaptation' },
            { name: 'blogs' },
            { name: 'social media' },
            { name: 'formatting' },
        ],
    },
    {
        title: 'The Role of Visuals in Articles',
        subtitle: 'Enhancing Content with Images and Graphics',
        body: 'Visuals can make articles more appealing and help convey complex ideas. Learn how to use images and graphics effectively in your writing...',
        slug: 'role-of-visuals-in-articles',
        tags: [
            { name: 'visuals' },
            { name: 'images' },
            { name: 'graphics' },
            { name: 'content enhancement' },
            { name: 'engagement' },
        ],
    },
    {
        title: 'Creating a Strong Writing Routine',
        subtitle: 'Developing Habits that Lead to Consistent Output',
        body: 'Consistency is key to improving your writing. This article offers tips on establishing a writing routine that enhances productivity and creativity...',
        slug: 'creating-strong-writing-routine',
        tags: [
            { name: 'routine' },
            { name: 'consistency' },
            { name: 'productivity' },
            { name: 'habits' },
            { name: 'creativity' },
        ],
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
                fetch(`http://localhost:3000/api/v1/users/`, {
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

async function insertArticles(
    articles: {
        title: string;
        subtitle: string;
        body: string;
        slug: string;
    }[]
) {
    try {
        await Promise.all(
            articles.map((article) =>
                fetch(`http://localhost:3000/api/v1/articles/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTUiLCJpYXQiOjE3MzE2ODE3MjksImV4cCI6MTczMTY4NTMyOX0.w9o_DBa3GeLLyIFgkjwQYoNs7Y5V624LBZcdR323Jbs',
                    },
                    body: JSON.stringify(article),
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((error) =>
                        console.error('Error inserting article:', error)
                    )
            )
        );
    } catch (error) {
        console.error('Error inserting articles:', error);
    }
}

// insertUsers(users);
// insertArticles(articles);
