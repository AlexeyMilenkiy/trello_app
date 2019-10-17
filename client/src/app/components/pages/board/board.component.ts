import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BoardsService } from '@app/services/boards.service';
import { BoardResponse } from '@app/interfaces/board-response';

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

  protected tableTodo = 1;
  protected tableDoing = 2;
  protected tableDone = 3;

  defaultCards = [
    [],
    [],
    []
  ];
  board: BoardResponse;
  subscriptions: Subscription = new Subscription();
  isError = false;

  constructor(private activateRoute: ActivatedRoute,
              private boardsService: BoardsService) {
  }

  ngOnInit(): void {
    const boardId = parseInt(this.activateRoute.snapshot.params.id, 10);
    this.subscriptions.add(this.boardsService.getBoard(boardId)
      .subscribe((board: BoardResponse) => {
          this.board = {...board};
          console.log(this.board);
        },
        (error) => {
          if ((error.status !== 401) && (error.status !== 422)) {
            this.isError = true;
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
