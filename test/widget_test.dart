import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:memory_jar/app.dart';

void main() {
  testWidgets('Memory Jar app smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      const ProviderScope(
        child: MemoryJarApp(),
      ),
    );

    // Verify that the app starts correctly
    expect(find.byType(MemoryJarApp), findsOneWidget);
  });
}
