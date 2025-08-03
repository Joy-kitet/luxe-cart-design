import 'package:freezed_annotation/freezed_annotation.dart';

part 'product_model.freezed.dart';
part 'product_model.g.dart';

@freezed
class ProductModel with _$ProductModel {
  const factory ProductModel({
    required String id,
    required String name,
    required double price,
    double? originalPrice,
    required String image,
    required double rating,
    required int reviews,
    String? description,
    String? category,
    List<String>? colors,
    List<String>? sizes,
    @Default(true) bool inStock,
    @Default(false) bool isFeatured,
    @JsonKey(name: 'created_at') DateTime? createdAt,
    @JsonKey(name: 'updated_at') DateTime? updatedAt,
    Map<String, dynamic>? metadata,
  }) = _ProductModel;

  factory ProductModel.fromJson(Map<String, dynamic> json) =>
      _$ProductModelFromJson(json);
}

@freezed
class CategoryModel with _$CategoryModel {
  const factory CategoryModel({
    required String id,
    required String title,
    required String image,
    required int productCount,
    String? description,
  }) = _CategoryModel;

  factory CategoryModel.fromJson(Map<String, dynamic> json) =>
      _$CategoryModelFromJson(json);
}

// Extension for business logic
extension ProductModelX on ProductModel {
  bool get hasDiscount => originalPrice != null && originalPrice! > price;
  
  double get discountPercentage {
    if (!hasDiscount) return 0.0;
    return ((originalPrice! - price) / originalPrice!) * 100;
  }
  
  String get formattedPrice => '\$${price.toStringAsFixed(0)}';
  
  String get formattedOriginalPrice => 
      originalPrice != null ? '\$${originalPrice!.toStringAsFixed(0)}' : '';
  
  String get formattedRating => rating.toStringAsFixed(1);
  
  String get formattedReviews => '($reviews)';
}