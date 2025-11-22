module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/proyectofinal4 (3)/lib/simple-auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return {
                success: true
            };
        } else if (isClient) {
            const user = {
                uid: '2',
                email,
                role: 'client'
            };
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return {
            success: true
        };
    },
    logout: ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    },
    getCurrentUser: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
        const userStr = undefined;
    },
    getCurrentRole: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    },
    toggleFavorite: (productId)=>{
        if ("TURBOPACK compile-time truthy", 1) return {
            success: false
        };
        //TURBOPACK unreachable
        ;
        const userStr = undefined;
        const user = undefined;
        const favorites = undefined;
        const index = undefined;
        let newFavorites;
        const updatedUser = undefined;
    },
    getFavorites: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return [];
        //TURBOPACK unreachable
        ;
        const userStr = undefined;
        const user = undefined;
    }
};
}),
"[project]/proyectofinal4 (3)/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$lib$2f$simple$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/proyectofinal4 (3)/lib/simple-auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    user: null,
    loading: true,
    role: null
});
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load user from localStorage on mount
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$lib$2f$simple$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simpleAuth"].getCurrentUser();
        const currentRole = __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$lib$2f$simple$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simpleAuth"].getCurrentRole();
        if (currentUser) {
            setUser(currentUser);
            setRole(currentRole);
        }
        setLoading(false);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$proyectofinal4__$28$3$292f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
}),
"[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/proyectofinal4 (3)/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__480e42ac._.js.map