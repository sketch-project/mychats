<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'active_status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function isOnline(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => $value && $attributes['active_status'],
            set: fn ($value) => (int) $value
        );
    }

    protected function activeStatus(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (bool) $value,
            set: fn ($value) => (int) $value
        );
    }

    protected function isContactBlocked(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (bool) $value,
            set: fn ($value) => (int) $value
        );
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(ChatContact::class, 'user_id');
    }

    public function chatMessageColors(): HasMany
    {
        return $this->hasMany(ChatMessageColor::class, 'from_id');
    }

    public function is_contact_saved(string $id)
    {
        return $this->contacts()
                ->where('contact_id', $id)
                ->first()
                ?->is_saved != null;
    }

    public function is_contact_blocked(string $id)
    {
        return $this->contacts()
                ->where('contact_id', $id)
                ->first()
                ?->is_blocked != null;
    }

    public function messageColor(string $id)
    {
        return $this->chatMessageColors()
            ->where('to_id', $id)
            ->first()
            ?->message_color ?? null;
    }

    #[Scope]
    public function online(Builder $query): void
    {
        $query->where('is_online', true);
    }

    #[Scope]
    public function inactive(Builder $query): void
    {
        $query->online()->where('last_seen', '<', now()->subSeconds(30));
    }
}
