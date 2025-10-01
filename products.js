// Product Database - Easy to modify and add new products
const products = [
    {
        id: '1',
        name: 'Minecraft (Java + Bedrock)',
        basePrice: 4499,
        image: 'https://tse3.mm.bing.net/th/id/OIP.KO2HbRC_h67s9ACdI4VyzAHaDu?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Redeem Code',
        platform: 'PC',
        description: 'Brand New Minecraft Redeem Code with Java + Bedrock editions included.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '2',
        name: 'Menace Cape',
        basePrice: 250,
        image: 'https://minecraft.wiki/images/Menace_cape_artwork.png?0f97f&format=original',
        category: 'Cosmetic',
        platform: 'PC/Mobile',
        description: 'Exclusive Menace Cape for your Minecraft character.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '3',
        name: 'Home Cape',
        basePrice: 1000,
        image: 'https://s.namemc.com/3d/skin/body.png?id=12b92a9206470fe2&cape=afc3ba389452cbb1&theta=210&width=256&height=256',
        category: 'Cosmetic',
        platform: 'PC/Mobile',
        description: 'Exclusive Menace Cape for your Minecraft character.',
        discount: 50,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '4',
        name: 'Free Fire Diamonds',
        basePrice: 90,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: 'Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '1-1', name: '115 Diamonds', price: 90, description: '115💎 Basic Pack' },
            { id: '1-2', name: '240 Diamonds', price: 180, description: '240💎 Popular Choice' },
            { id: '1-3', name: '610 Diamonds', price: 435, description: '610💎 Best Value' },
            { id: '1-4', name: '1240 Diamonds', price: 855, description: '1240💎 Premium Pack' },
            { id: '1-5', name: '5060 Diamonds', price: 3410, description: '5060💎 MEGA PACK' }
        ],
        inStock: true
    },
    {
        id: '5',
        name: 'PUBG UC',
        basePrice: 150,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: 'PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '2-1', name: '60 UC', price: 150, description: '60 UC Basic Pack' },
            { id: '2-2', name: '120 UC', price: 295, description: '120 UC Popular Choice' },
            { id: '2-3', name: '325 UC', price: 762, description: '325 UC Great Value' },
            { id: '2-4', name: '660 UC', price: 1485, description: '660 UC Best Deal' },
            { id: '2-5', name: '985 UC', price: 2231, description: '985 UC Premium Pack' }
        ],
        inStock: true
    },
    {
        id: '6',
        name: 'Discord Nitro',
        basePrice: 440,
        image: 'https://tse4.mm.bing.net/th/id/OIP.htlr6BrX9NbKhKFN6uQabgHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Subscription',
        platform: 'PC/Mobile',
        description: 'Discord Nitro subscription with enhanced features.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '4-1', name: 'Nitro Basic - 1 Month', price: 440, description: 'Basic features and perks' },
            { id: '4-2', name: 'Nitro Premium - 1 Month', price: 1499, description: 'All features unlocked' }
        ],
        inStock: true
    },
    {
        id: '7',
        name: 'Roblox Robux',
        basePrice: 720,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/1024px-Robux_2019_Logo_gold.svg.png?20201227051146',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: 'Roblox Robux for games, accessories, and upgrades.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '5-1', name: '400 Robux Gift Card', price: 720, description: 'Digital Gift Card' }
        ],
        inStock: true
    },
    {
        id: '8',
        name: 'Roblox Gamepass',
        basePrice: 99,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/1024px-Robux_2019_Logo_gold.svg.png?20201227051146',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: 'Buy any custom amount of Robux at Rs. 2 per Robux.',
        discount: 5,
        hasSubProducts: true, // keep true so button shows
        subProducts: [], // leave empty
        inStock: true
    },
    {
        id: '9',
        name: 'Netflix Account',
        basePrice: 399,
        image: 'https://th.bing.com/th/id/OIP.yLxJB4Y-b4_cEuE-JNNYfQHaFj?w=285&h=214&c=7&r=0&o=7&pid=1.7&rm=3', // Example Netflix logo
        category: 'Streaming Service',
        platform: 'PC/Mobile',
        description: 'Netflix subscription accounts available as shared or personal. Choose the plan that suits you.',
        discount: 0,
        hasSubProducts: true,
        subProducts: [
            { id: '9-1', name: 'Shared Account', price: 399, description: 'Shared Netflix Account Plan' },
            { id: '9-2', name: 'Personal Account', price: 499, description: 'Personal Netflix Account Plan' }
        ],
        inStock: true
    },
    {
        id: '10',
        name: 'Among Us (Epic Games)',
        basePrice: 299,
        image: 'https://www.bing.com/th/id/OIP.eMKr4WZ8Ua76OhcPNRnHOQHaEK?w=258&h=211&c=8&rs=1&qlt=70&o=7&cb=thws5&pid=3.1&rm=3',
        category: 'Game',
        platform: 'PC',
        description: 'Among Us - The popular social deduction game available via Epic Games.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '11',
        name: 'FTL: Faster Than Light',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/212680/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Indie space strategy roguelike where every playthrough is a unique challenge.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '12',
        name: 'Contagion',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/238430/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Co-op zombie survival horror with both PvE and PvP modes.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '13',
        name: 'Brotato',
        basePrice: 799,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/1942280/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'A top-down arena shooter roguelite featuring a potato warrior with crazy weapons.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '14',
        name: 'Cultic',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/1684930/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Retro-inspired horror FPS where you fight cultists with classic weaponry.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '15',
        name: 'Heavy Bullets',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/297120/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'A fast-paced, procedurally generated FPS with a focus on resource management.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '16',
        name: 'People Playground',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/1118200/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'A physics sandbox where you can experiment with creativity and destruction.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '17',
        name: 'Terraria',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: '2D sandbox adventure game filled with crafting, exploration, and combat.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '18',
        name: 'Portal 2',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Legendary puzzle-platform game with mind-bending physics and co-op mode.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '19',
        name: 'Left 4 Dead 2',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Valve\'s classic co-op zombie shooter full of action and replayability.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '20',
        name: 'Hotline Miami',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/219150/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Fast-paced, brutal top-down action with a legendary soundtrack.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '21',
        name: 'Undertale',
        basePrice: 1499,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Beloved indie RPG with unique choices and unforgettable characters.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '22',
        name: 'Among Us',
        basePrice: 799,
        image: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
        category: 'PC Game',
        platform: 'Steam',
        description: 'Social deduction game of teamwork and betrayal in space.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    }
];

// Function to calculate final price after discount
function calculatePrice(product) {
    if (product.discount > 0) {
        return Math.round(product.basePrice * (1 - product.discount / 100));
    }
    return product.basePrice;
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

// Function to search products (fuzzy search)
function searchProducts(query) {
    if (!query.trim()) {
        return products;
    }

    const searchTerm = query.toLowerCase().trim();

    return products.filter(product => {
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        const category = product.category.toLowerCase();
        const platform = product.platform.toLowerCase();

        // Exact match first
        if (name.includes(searchTerm) || description.includes(searchTerm) ||
            category.includes(searchTerm) || platform.includes(searchTerm)) {
            return true;
        }

        // Fuzzy search - allow for minor misspellings
        const words = searchTerm.split(' ');
        return words.some(word => {
            if (word.length < 3) return false; // Skip very short words for fuzzy matching

            return name.includes(word) || description.includes(word) ||
                   category.includes(word) || platform.includes(word) ||
                   // Check for similar words (basic fuzzy logic)
                   isWordSimilar(word, name) || isWordSimilar(word, description);
        });
    });
}

// Basic fuzzy string matching
function isWordSimilar(word, text) {
    const words = text.split(' ');
    return words.some(textWord => {
        if (textWord.length < 3 || word.length < 3) return false;

        // Check if words are similar (allowing 1-2 character differences)
        let differences = 0;
        const minLength = Math.min(word.length, textWord.length);
        const maxLength = Math.max(word.length, textWord.length);

        if (maxLength - minLength > 2) return false; // Too different in length

        for (let i = 0; i < minLength; i++) {
            if (word[i] !== textWord[i]) {
                differences++;
                if (differences > 2) return false;
            }
        }

        return differences <= 2;
    });
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.productsDatabase = {
        products,
        calculatePrice,
        getProductsByCategory,
        searchProducts
    };
}