import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BoardsService } from '@app/services/boards.service';
import { BoardResponse } from '@app/interfaces/board-response';
import { CardResponse } from '@app/interfaces/card-response';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnDestroy {

  protected tablesMap = {
    1: 'Todo',
    2: 'Doing',
    3: 'Done',
  };

  protected cardsArray = [
    [], // Todo cards
    [], // Doing cards
    []  // Done cards
  ];

  boardId = 0;
  board: BoardResponse;
  subscriptions: Subscription = new Subscription();
  isError = false;

  constructor(private activateRoute: ActivatedRoute,
              private boardsService: BoardsService,
              private router: Router) {
  }

  separateCardsArray() {
    this.board.cards.forEach((card: CardResponse) => {
      card.position = Number(card.position); /// changed string to number
      switch (card.table_id) {
        case 1:
          this.cardsArray[0].push(card);
          break;
        case 2:
          this.cardsArray[1].push(card);
          break;
        case 3:
          this.cardsArray[2].push(card);
      }
    });
  }

  ngOnInit(): void {
    this.boardId = parseInt(this.activateRoute.snapshot.params.id, 10);

    this.subscriptions.add(this.boardsService.getBoard(this.boardId)
      .subscribe((board: BoardResponse) => {
          this.board = {...board};
          this.separateCardsArray();

          setTimeout(() => {
            const card = {
              board_id: 1,
              description: null,
              id: 10,
              position: 4234234,
              table_id: 1,
              title: '123423333333333333'};

            this.cardsArray[0].push(card);
          }, 4000);

          setTimeout(() => {

            this.cardsArray[0][0].title = '00000000' ;
          }, 7000);
        },
        (error) => {
          if (error.status === 404) {
            this.router.navigate(['not-found']);
          } else if ((error.status !== 401) && (error.status !== 422)) {
            this.isError = true;
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
