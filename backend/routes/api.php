<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InsertController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/insert',[InsertController::class, 'create']);
Route::post('/read',[InsertController::class, 'index']);
Route::post('/delete',[InsertController::class, 'delete']);
Route::post('/update',[InsertController::class, 'update']);