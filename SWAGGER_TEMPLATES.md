# Swagger Annotation Templates

When adding new routes, you can copy and modify these templates. The schemas are already defined in `src/config/swagger.ts`, so you just reference them.

## GET Route (No Auth)
```typescript
/**
 * @swagger
 * /api/v1/your-path:
 *   get:
 *     summary: Your summary
 *     tags: [YourTag]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/YourSchema'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

## GET Route (With Auth)
```typescript
/**
 * @swagger
 * /api/v1/your-path:
 *   get:
 *     summary: Your summary
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/YourSchema'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

## POST Route
```typescript
/**
 * @swagger
 * /api/v1/your-path:
 *   post:
 *     summary: Your summary
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []  // Remove this line if no auth needed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YourRequestSchema'
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/YourResponseSchema'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

## PUT/DELETE Route with Path Parameter
```typescript
/**
 * @swagger
 * /api/v1/your-path/{id}:
 *   put:  // or delete
 *     summary: Your summary
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource ID
 *     requestBody:  // Only for PUT
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YourRequestSchema'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/YourResponseSchema'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
```

## Notes:
- **Schemas** are defined once in `src/config/swagger.ts` - just reference them with `$ref: '#/components/schemas/YourSchema'`
- **Tags** should match the tags defined in `swagger.ts` (currently: "Authentication", "Todos")
- **Security** - add `security: - bearerAuth: []` for protected routes
- **Arrays** - use `type: array` with `items: $ref: '#/components/schemas/YourSchema'`

