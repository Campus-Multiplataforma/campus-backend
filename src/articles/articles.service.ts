import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class ArticlesService {
  constructor(private db: DatabaseService) {}

  async findAll() {
    const result = await this.db.query(
      'SELECT id, title, position FROM articles ORDER BY position ASC',
    );
    return result.rows;
  }

  async reorder(reorderedArticles: { id: string; position: number }[]) {
    return this.db.transaction(async (client) => {
      for (const article of reorderedArticles) {
        await client.query(
          'UPDATE articles SET position = $1 WHERE id = $2',
          [article.position, article.id],
        );
      }
      
      const result = await client.query(
        'SELECT id, title, position FROM articles ORDER BY position ASC',
      );
      return result.rows;
    });
  }
}
