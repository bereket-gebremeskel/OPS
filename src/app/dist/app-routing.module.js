"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var router_1 = require("@angular/router");
var shell_component_1 = require("./components/layout/home/shell/shell.component");
var core_1 = require("@angular/core");
var login_component_1 = require("./components/authentication/login/login.component");
var sign_up_component_1 = require("./components/authentication/sign-up/sign-up.component");
var authGuard_guard_1 = require("./components/auth/authGuard.guard");
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'signup',
        component: sign_up_component_1.SignUpComponent
    },
    {
        path: '',
        component: shell_component_1.ShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'product',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require("./components/product/product.module"); }).then(function (p) { return p.ProductModule; });
                }
            },
            {
                path: 'setting',
                canActivate: [authGuard_guard_1.AuthGuardGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require("./components/setting/setting.module"); }).then(function (s) { return s.SettingModule; }); }
            },
            {
                path: 'cart',
                canActivate: [authGuard_guard_1.AuthGuardGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require("./components/cart/cart.module"); }).then(function (c) { return c.CartModule; }); }
            },
            {
                path: 'orders',
                canActivate: [authGuard_guard_1.AuthGuardGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require("./components/ordered-product/ordered-product.module"); }).then(function (o) { return o.OrderedProductModule; }); }
            },
            {
                path: 'profile',
                canActivate: [authGuard_guard_1.AuthGuardGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require("./components/user-profile/user-profile.module"); }).then(function (u) { return u.UserProfileModule; }); }
            },
            {
                path: 'users',
                canActivate: [authGuard_guard_1.AuthGuardGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require("./components/user/user.module"); }).then(function (u) { return u.UserModule; }); }
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
