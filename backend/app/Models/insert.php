<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class insert extends Model
{
    protected $fillable = [
        'name',
        'mob',
        'email',
        'address'
    ];
}
