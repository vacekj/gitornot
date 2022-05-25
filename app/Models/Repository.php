<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Repository
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @property int $stars
 * @property int $owner_id
 * @method static \Database\Factories\RepositoryFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Repository newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Repository query()
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereStars($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $forks
 * @property string|null $description
 * @property string|null $languages
 * @property int $user_id
 * @property string $url
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereForks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereLanguages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repository whereUserId($value)
 */
class Repository extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'stars',
        'user_id',
        'forks',
        'description',
        'url'
    ];
}
