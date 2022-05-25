<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Swipe
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_id
 * @property int $repository_id
 * @property int $value
 * @method static \Database\Factories\SwipeFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe query()
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe whereRepositoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Swipe whereValue($value)
 * @mixin \Eloquent
 */
class Swipe extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function repository() {
        return $this->belongsTo(Repository::class);
    }
}
