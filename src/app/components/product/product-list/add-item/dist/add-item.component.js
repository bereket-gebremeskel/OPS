"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddItemComponent = void 0;
var core_1 = require("@angular/core");
var AddItemComponent = /** @class */ (function () {
    function AddItemComponent(fb, ref, config, itemService, unitService) {
        this.fb = fb;
        this.ref = ref;
        this.config = config;
        this.itemService = itemService;
        this.unitService = unitService;
    }
    AddItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unitService.getAllUnits().subscribe(function (res) {
            _this.units = res;
        });
        this.itemForm = this.fb.group({
            price: [''],
            stockQuantity: [0],
            unitId: [''],
            productId: [this.config.data._id]
        });
    };
    AddItemComponent.prototype.save = function () {
        this.itemService.createItem(this.itemForm.value).subscribe(function (res) {
        });
    };
    AddItemComponent = __decorate([
        core_1.Component({
            selector: 'app-add-item',
            templateUrl: './add-item.component.html',
            styleUrls: ['./add-item.component.css']
        })
    ], AddItemComponent);
    return AddItemComponent;
}());
exports.AddItemComponent = AddItemComponent;
