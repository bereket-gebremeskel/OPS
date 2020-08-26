"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddProductComponent = void 0;
var core_1 = require("@angular/core");
var AddProductComponent = /** @class */ (function () {
    function AddProductComponent(fb, categoryService, subCategoryService, productService, route, userServce) {
        this.fb = fb;
        this.categoryService = categoryService;
        this.subCategoryService = subCategoryService;
        this.productService = productService;
        this.route = route;
        this.userServce = userServce;
    }
    AddProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            var _a;
            if (data.product) {
                _this.product = data.product;
                _this.getSubCategory(_this.product.subCategory.category._id);
                _this.pupulateData();
            }
            else {
                _this.user = _this.userServce.currentUser();
                _this.productForm = _this.fb.group({
                    name: [''],
                    userId: [(_a = _this.user) === null || _a === void 0 ? void 0 : _a._id],
                    description: [''],
                    imageUrl: [''],
                    subCategoryId: ['']
                });
            }
        });
        this.categoryService.getAllCategories().subscribe(function (res) {
            _this.categories = res;
        });
        // this.subCategoryService.getAllSubCategories().subscribe(res =>  {
        //   this.subCategories = res;
        // });
    };
    AddProductComponent.prototype.getSubCategory = function (id) {
        var _this = this;
        var x = "bek";
        this.subCategoryService.getSubCategoryByCategoryId(id).subscribe(function (subcategories) {
            _this.subCategories = subcategories;
        });
    };
    AddProductComponent.prototype.save = function () {
        var _this = this;
        var _a;
        if ((_a = this.product) === null || _a === void 0 ? void 0 : _a._id) {
            this.productService.updateProduct(this.productForm.value).subscribe(function (res) {
                _this.productForm.reset();
                _this.previousState();
            });
        }
        else {
            this.productService.createProduct(this.productForm.value).subscribe(function (res) {
                _this.productForm.reset();
                _this.previousState();
            });
        }
    };
    AddProductComponent.prototype.pupulateData = function () {
        // this.productForm.patchValue({
        //   name:this.product.name,
        //   userId:this.product.userId,
        //   description:this.product.description,
        //   imageUrl:this.product.imageUrl,
        //   subCategoryId:this.product.subCategory.subCategoryId
        // });
        this.productForm = this.fb.group({
            _id: this.product._id,
            name: this.product.name,
            userId: this.product.userId,
            description: this.product.description,
            imageUrl: this.product.imageUrl,
            subCategoryId: this.product.subCategory.subCategoryId
        });
    };
    AddProductComponent.prototype.previousState = function () {
        window.history.back();
    };
    AddProductComponent = __decorate([
        core_1.Component({
            selector: 'app-add-product',
            templateUrl: './add-product.component.html',
            styleUrls: ['./add-product.component.css']
        })
    ], AddProductComponent);
    return AddProductComponent;
}());
exports.AddProductComponent = AddProductComponent;
