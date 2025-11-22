(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/proyectofinal4 (3)/lib/simple-auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Storage keys
__turbopack_context__.s([
    "simpleAuth",
    ()=>simpleAuth
]);
const STORAGE_USER_KEY = 'milaencanto_user';
const STORAGE_ROLE_KEY = 'milaencanto_role';
const simpleAuth = {
    // Mock users for demo
    demoUsers: {
        admin: {
            email: 'admin@milaencanto.com',
            password: 'admin123',
            role: 'admin'
        },
        client: {
            email: 'cliente@milaencanto.com',
            password: 'cliente123',
            role: 'client'
        }
    },
    register: (email, password, name, phone, role = 'client')=>{
        if (!email || !password || !name || !phone) {
            return {
                success: false,
                error: 'Todos los campos son requeridos'
            };
        }
        // In real app, this would call Firebase
        const user = {
            uid: Date.now().toString(),
            email,
            name,
            phone,
            role
        };
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
            localStorage.setItem(STORAGE_ROLE_KEY, role);
        }
        return {
            success: true
        };
    },
    login: (email, password)=>{
        if (!email || !password) {
            return {
                success: false,
                error: 'Email y contraseña son requeridos'
            };
        }
        // Demo check
        const isAdmin = email === simpleAuth.demoUsers.admin.email && password === simpleAuth.demoUsers.admin.password;
        const isClient = email === simpleAuth.demoUsers.client.email && password === simpleAuth.demoUsers.client.password;
        if (isAdmin) {
            const user = {
                uid: '1',
                email,
                role: 'admin'
            };
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
                localStorage.setItem(STORAGE_ROLE_KEY, 'admin');
            }
            return {
                success: true
            };
        } else if (isClient) {
            const user = {
                uid: '2',
                email,
                role: 'client'
            };
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
                localStorage.setItem(STORAGE_ROLE_KEY, 'client');
            }
            return {
                success: true
            };
        }
        // For other emails, create a client account
        const user = {
            uid: Date.now().toString(),
            email,
            role: 'client'
        };
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
            localStorage.setItem(STORAGE_ROLE_KEY, 'client');
        }
        return {
            success: true
        };
    },
    logout: ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem(STORAGE_USER_KEY);
            localStorage.removeItem(STORAGE_ROLE_KEY);
        }
    },
    getCurrentUser: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const userStr = localStorage.getItem(STORAGE_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },
    getCurrentRole: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem(STORAGE_ROLE_KEY) || null;
    },
    toggleFavorite: (productId)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const userStr = localStorage.getItem(STORAGE_USER_KEY);
        if (!userStr) return {
            success: false
        };
        const user = JSON.parse(userStr);
        const favorites = user.favorites || [];
        const index = favorites.indexOf(productId);
        let newFavorites;
        if (index === -1) {
            newFavorites = [
                ...favorites,
                productId
            ];
        } else {
            newFavorites = favorites.filter((id)=>id !== productId);
        }
        const updatedUser = {
            ...user,
            favorites: newFavorites
        };
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updatedUser));
        return {
            success: true,
            favorites: newFavorites
        };
    },
    getFavorites: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const userStr = localStorage.getItem(STORAGE_USER_KEY);
        if (!userStr) return [];
        const user = JSON.parse(userStr);
        return user.favorites || [];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/proyectofinal4 (3)/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proyectofinal4 (3)/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proyectofinal4 (3)/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$lib$2f$simple$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proyectofinal4 (3)/lib/simple-auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    user: null,
    loading: true,
    role: null
});
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Load user from localStorage on mount
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$lib$2f$simple$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simpleAuth"].getCurrentUser();
            const currentRole = __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$lib$2f$simple$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simpleAuth"].getCurrentRole();
            if (currentUser) {
                setUser(currentUser);
                setRole(currentRole);
            }
            setLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            role
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/proyectofinal4 (3)/lib/auth-context.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "RMTrf4bKTOc+l0AUzci3b6JKaUQ=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=proyectofinal4%20%283%29_lib_8358db5f._.js.map