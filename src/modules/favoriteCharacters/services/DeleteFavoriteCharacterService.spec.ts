import FakeFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/fakes/FakeFavoriteCharacterRepository';
import DeleteFavoriteCharacterService from '@modules/favoriteCharacters/services/DeleteFavoriteCharacterService';
import AppError from '@shared/errors/AppError';

let fakeFavoriteCharacterRepository: FakeFavoriteCharacterRepository;
let deleteFavoriteCharacterService: DeleteFavoriteCharacterService;

describe('DeleteFavoriteCharacterService', () => {
  beforeEach(() => {
    fakeFavoriteCharacterRepository = new FakeFavoriteCharacterRepository();

    deleteFavoriteCharacterService = new DeleteFavoriteCharacterService(
      fakeFavoriteCharacterRepository,
    );
  });

  it('should be able to delete a favorite character', async () => {
    const favoriteCharacter = await fakeFavoriteCharacterRepository.create({
      user_id: 'qualquer',
      code: 1017100,
      name: 'A-Bomb (HAS)',
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
      thumbnail_extension:
        'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      thumbnail_path: 'jpg',
    });

    await expect(
      deleteFavoriteCharacterService.execute({
        user_id: favoriteCharacter.user_id,
        code: favoriteCharacter.code,
      }),
    ).resolves;
  });

  it('should not be able to delete a inexistent favorite character', async () => {
    await expect(
      deleteFavoriteCharacterService.execute({
        user_id: 'inexistent_id',
        code: 1245,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
