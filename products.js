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
    // Free Fire Diamonds - Converted from sub-products
    {
        id: '4-1',
        name: 'Free Fire 115 Diamonds',
        basePrice: 90,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '115💎 Basic Pack - Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '4-2',
        name: 'Free Fire 240 Diamonds',
        basePrice: 180,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '240💎 Popular Choice - Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '4-3',
        name: 'Free Fire 610 Diamonds',
        basePrice: 435,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '610💎 Best Value - Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '4-4',
        name: 'Free Fire 1240 Diamonds',
        basePrice: 855,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '1240💎 Premium Pack - Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '4-5',
        name: 'Free Fire 5060 Diamonds',
        basePrice: 3410,
        image: 'https://www.talkesport.com/wp-content/uploads/free-fire-free-diamonds.webp',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '5060💎 MEGA PACK - Free Fire Diamonds for characters, skins and upgrades. UID Required.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    // PUBG UC - Converted from sub-products
    {
        id: '5-1',
        name: 'PUBG 60 UC',
        basePrice: 150,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '60 UC Basic Pack - PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '5-2',
        name: 'PUBG 120 UC',
        basePrice: 295,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '120 UC Popular Choice - PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '5-3',
        name: 'PUBG 325 UC',
        basePrice: 762,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '325 UC Great Value - PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '5-4',
        name: 'PUBG 660 UC',
        basePrice: 1485,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '660 UC Best Deal - PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '5-5',
        name: 'PUBG 985 UC',
        basePrice: 2231,
        image: 'https://th.bing.com/th/id/OIP.f1nTlu-kk76qdgoJwZJXPwHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: '985 UC Premium Pack - PUBG Unknown Cash for in-game purchases and upgrades.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    // Discord Nitro - Converted from sub-products
    {
        id: '6-1',
        name: 'Discord Nitro Basic - 1 Month',
        basePrice: 440,
        image: 'https://tse4.mm.bing.net/th/id/OIP.htlr6BrX9NbKhKFN6uQabgHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Subscription',
        platform: 'PC/Mobile',
        description: 'Basic features and perks - Discord Nitro subscription with enhanced features.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '6-2',
        name: 'Discord Nitro Premium - 1 Month',
        basePrice: 1499,
        image: 'https://tse4.mm.bing.net/th/id/OIP.htlr6BrX9NbKhKFN6uQabgHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
        category: 'Subscription',
        platform: 'PC/Mobile',
        description: 'All features unlocked - Discord Nitro subscription with enhanced features.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    // Roblox Products
    {
        id: '7',
        name: 'Roblox 400 Robux Gift Card',
        basePrice: 720,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/1024px-Robux_2019_Logo_gold.svg.png?20201227051146',
        category: 'Game Currency',
        platform: 'PC/Mobile',
        description: 'Digital Gift Card - Roblox Robux for games, accessories, and upgrades.',
        discount: 0,
        hasSubProducts: false,
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
        hasSubProducts: true,
        subProducts: [],
        inStock: true
    },
    // Netflix Accounts - Converted from sub-products
    {
        id: '9-1',
        name: 'Netflix Shared Account',
        basePrice: 399,
        image: 'https://th.bing.com/th/id/OIP.yLxJB4Y-b4_cEuE-JNNYfQHaFj?w=285&h=214&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Streaming Service',
        platform: 'PC/Mobile',
        description: 'Shared Netflix Account Plan - Netflix subscription accounts available.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    {
        id: '9-2',
        name: 'Netflix Personal Account',
        basePrice: 499,
        image: 'https://th.bing.com/th/id/OIP.yLxJB4Y-b4_cEuE-JNNYfQHaFj?w=285&h=214&c=7&r=0&o=7&pid=1.7&rm=3',
        category: 'Streaming Service',
        platform: 'PC/Mobile',
        description: 'Personal Netflix Account Plan - Netflix subscription accounts available.',
        discount: 0,
        hasSubProducts: false,
        inStock: true
    },
    // Games
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

// Sample product banner ads data
const productBanners = [
    {
        id: 'pb1',
        name: 'Gaming Headset Special',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
        link: 'https://example.com/headset-offer'
    },
    {
        id: 'pb2', 
        name: 'RGB Keyboard Deal',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
        link: 'https://example.com/keyboard-deal'
    },
    {
        id: 'pb3',
        name: 'Gaming Mouse Promo',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
        link: 'https://example.com/mouse-promo'
    }
];

const productsDatabase = {
    products: products,
    productBanners: productBanners,
    
    searchProducts(query) {
        if (!query) return this.products;
        
        const lowercaseQuery = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.category.toLowerCase().includes(lowercaseQuery) ||
            product.platform.toLowerCase().includes(lowercaseQuery)
        );
    },
    
    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(product => product.category === category);
    },
    
    calculatePrice(product) {
        if (product.discount > 0) {
            return Math.round(product.basePrice * (1 - product.discount / 100));
        }
        return product.basePrice;
    },
    
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
};
