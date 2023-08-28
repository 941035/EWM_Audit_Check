/*global QUnit*/

sap.ui.define([
	"comewmauditparker/zewmauditcheck/controller/DelAuditView1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("DelAuditView1 Controller");

	QUnit.test("I should test the DelAuditView1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
