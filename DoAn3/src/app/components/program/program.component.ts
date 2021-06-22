import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/common/program';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  program: Program[] = [];
  constructor(private programService: ProgramService,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.showAllProgramCategory();
  }
  showAllProgramCategory() {
    this.programService.getProgramCategory().subscribe(
      data => {
        this.program = data;
      }
    );
  }
}
