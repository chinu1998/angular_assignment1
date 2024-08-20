import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    MatSelectModule, 
    MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  games: any[] = [];
  filteredGames: any[] = [];
  paginatedGames: any[] = [];
  loading = false;
  searchTerm = '';
  selectedGenre = '';
  selectedRating = '';
  minScore: any = '';
  orderBy: string = 'firstReleaseDate'; // Set 'Release Date' as the default value
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;
    this.gameService.getGames().subscribe({
      next: (response) => {
        this.games = response.data;
        this.filteredGames = this.games;

        // Initially sort by firstReleaseDate when the page loads
        this.filteredGames.sort((a, b) => new Date(a.attributes.firstReleaseDate).getTime() - new Date(b.attributes.firstReleaseDate).getTime());

        this.applyPagination(); // Update pagination after sorting
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching games:', error);
        this.loading = false;
      }
    });
  }

  filterGames(): void {
    // Apply filters
    this.filteredGames = this.games.filter(game =>
      game.attributes.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedGenre ? game.attributes.genre === this.selectedGenre : true) &&
      (this.selectedRating ? game.attributes.rating >= parseFloat(this.selectedRating) : true) &&
      (this.minScore ? game.attributes.rating >= this.minScore : true)
    );

    // Sort logic based on the orderBy value
    if (this.orderBy === 'firstReleaseDate') {
      this.filteredGames.sort((a, b) => new Date(a.attributes.firstReleaseDate).getTime() - new Date(b.attributes.firstReleaseDate).getTime());
    } else if (this.orderBy === 'rating') {
      this.filteredGames.sort((a, b) => b.attributes.rating - a.attributes.rating);
    } else if (this.orderBy === 'name') {
      this.filteredGames.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
    }

    this.applyPagination(); // Update pagination after sorting
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.selectedGenre = '';
    this.selectedRating = '';
    this.minScore = '';
    this.orderBy = 'firstReleaseDate';
    this.filterGames(); // Reapply filter after clearing
  }

  applyPagination(): void {
    const itemsPerPage = 10;
    this.totalPages = Math.ceil(this.filteredGames.length / itemsPerPage);
    this.paginatedGames = this.filteredGames.slice((this.currentPage - 1) * itemsPerPage, this.currentPage * itemsPerPage);
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.applyPagination();
  }
  
}
